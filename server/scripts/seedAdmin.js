import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/parking-management');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@parkingmanagement.com',
      password: 'Admin@123456',
      phone: '+1-555-0100',
      role: 'admin',
      isActive: true,
    });

    console.log('Admin user created successfully!');
    console.log('Admin Credentials:');
    console.log('================');
    console.log('Email: admin@parkingmanagement.com');
    console.log('Password: Admin@123456');
    console.log('================');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
