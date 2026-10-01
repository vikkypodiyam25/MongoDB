import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        complaintId: {
            type: String,
            required: [true, "Complaint ID is required"],
            unique: true,
            trim: true
        },
        studentName: {
            type: String,
            required: [true, "Student name is required"],
            trim: true
        },
        studentId: {
            type: String,
            required: [true, "Student ID is required"],
            trim: true
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["Internet", "Laptop", "Classroom", "Electricity", "Facilities", "Account"]
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        priority: {
            type: String,
            required: [true, "Priority is required"],
            enum: ["Low", "Medium", "High", "Critical", "medium"]
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            default: "Pending",
            enum: ["Pending", "In Progress", "Resolved", "pending"]
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now 
        }
    },
    {
        versionKey: false 
    }
);

const complaints = mongoose.model("Complaint", complaintSchema);

export default complaints;
