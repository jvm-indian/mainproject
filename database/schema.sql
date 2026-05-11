-- EcoChainAI Database Schema (PostgreSQL/Supabase)

-- Create ENUM types for classification
CREATE TYPE user_role AS ENUM ('Admin', 'SHG_Worker', 'Institution');
CREATE TYPE waste_category AS ENUM ('Organic', 'Plastic', 'Recyclable', 'Unsegregated');

-- Users Table
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    email VARCHAR(255) UNIQUE,
    digital_wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    institution_score INT DEFAULT 0, -- Used for Institutions only
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SmartBins Table
CREATE TABLE SmartBins (
    id VARCHAR(50) PRIMARY KEY, -- Using VARCHAR to support custom edge-node tracking IDs like '1jb23cs192'
    location_lat DECIMAL(9, 6) NOT NULL,
    location_lng DECIMAL(9, 6) NOT NULL,
    fill_level_percentage INT DEFAULT 0 CHECK (fill_level_percentage >= 0 AND fill_level_percentage <= 100),
    battery_health INT DEFAULT 100,
    network_status VARCHAR(50) DEFAULT 'Online',
    installed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WasteLogs Table
CREATE TABLE WasteLogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    smart_bin_id VARCHAR(50) REFERENCES SmartBins(id) ON DELETE CASCADE,
    image_hash VARCHAR(255),
    classification waste_category NOT NULL,
    weight_kg DECIMAL(8, 3) NOT NULL,
    moisture_level DECIMAL(5, 2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections Table
CREATE TABLE Collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shg_worker_id UUID REFERENCES Users(id) ON DELETE CASCADE,
    smart_bin_id VARCHAR(50) REFERENCES SmartBins(id) ON DELETE SET NULL,
    total_weight_kg DECIMAL(8, 3) NOT NULL,
    purity_score INT CHECK (purity_score >= 0 AND purity_score <= 100),
    payout_amount DECIMAL(10, 2) NOT NULL,
    collection_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE Products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    material_source VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    listed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Test Data
INSERT INTO Users (id, name, role, email) 
VALUES ('11111111-1111-1111-1111-111111111111', 'Jagannatha Vedamurthy', 'Admin', 'admin@ecochain.ai');

INSERT INTO SmartBins (id, location_lat, location_lng)
VALUES ('1jb23cs192', 12.9716, 77.5946); -- Default primary test edge-node
