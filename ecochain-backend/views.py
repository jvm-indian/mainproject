import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import SmartBin, WasteLog, User, Collection, UserRole

@csrf_exempt
@require_http_methods(["POST"])
def iot_data_ingestion(request):
    """
    Endpoint for IoT Smart Bins to push data after processing an item.
    Expected payload:
    {
        "bin_id": "1jb23cs192",
        "image_hash": "abc123hash",
        "classification": "Organic",
        "weight_kg": 0.45,
        "moisture_level": 12.5
    }
    """
    try:
        data = json.loads(request.body)
        bin_id = data.get("bin_id")
        
        # Verify bin exists
        try:
            smart_bin = SmartBin.objects.get(id=bin_id)
        except SmartBin.DoesNotExist:
            return JsonResponse({"error": "SmartBin not found"}, status=404)

        # Create waste log
        waste_log = WasteLog.objects.create(
            smart_bin=smart_bin,
            image_hash=data.get("image_hash"),
            classification=data.get("classification"),
            weight_kg=data.get("weight_kg"),
            moisture_level=data.get("moisture_level")
        )

        # Update bin fill level logic (simplified)
        smart_bin.fill_level_percentage = min(100, smart_bin.fill_level_percentage + 5)
        smart_bin.save()

        # If bin is almost full, trigger SHG alert (mock implementation)
        if smart_bin.fill_level_percentage >= 85:
            # TODO: Integrate with notification system (e.g. Twilio, Push Notification)
            print(f"ALERT: SmartBin {smart_bin.id} is {smart_bin.fill_level_percentage}% full. Alerting nearby SHG workers.")

        return JsonResponse({
            "message": "Data ingested successfully",
            "log_id": str(waste_log.id)
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def shg_worker_pickup(request):
    """
    Endpoint for SHG workers to log a pickup event after scanning QR code.
    Expected payload:
    {
        "worker_id": "uuid-here",
        "bin_id": "1jb23cs192",
        "total_weight_kg": 15.5,
        "purity_score": 92
    }
    """
    try:
        data = json.loads(request.body)
        worker_id = data.get("worker_id")
        bin_id = data.get("bin_id")
        weight = data.get("total_weight_kg")
        purity = data.get("purity_score")

        # Verify worker exists and is SHG
        try:
            worker = User.objects.get(id=worker_id, role=UserRole.SHG_WORKER)
        except User.DoesNotExist:
            return JsonResponse({"error": "SHG Worker not found"}, status=404)

        # Verify bin exists
        try:
            smart_bin = SmartBin.objects.get(id=bin_id)
        except SmartBin.DoesNotExist:
            return JsonResponse({"error": "SmartBin not found"}, status=404)

        # Calculate payout (e.g. $0.50 per kg * purity factor)
        payout = float(weight) * 0.50 * (float(purity) / 100.0)

        # Log collection
        collection = Collection.objects.create(
            shg_worker=worker,
            smart_bin=smart_bin,
            total_weight_kg=weight,
            purity_score=purity,
            payout_amount=payout
        )

        # Update wallet balance
        worker.digital_wallet_balance += payout
        worker.save()

        # Reset bin
        smart_bin.fill_level_percentage = 0
        smart_bin.save()

        return JsonResponse({
            "message": "Pickup logged successfully",
            "payout": round(payout, 2),
            "new_wallet_balance": round(worker.digital_wallet_balance, 2)
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
