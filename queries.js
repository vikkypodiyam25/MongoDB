// Run these queries one by one in mongosh.
// Database: campusconnect
// Collection: complaints

//use campusconnect

// 1. Show all complaints
db.complaints.find()


// 3. Count total complaints
db.complaints.countDocuments()

// 4. Find pending complaints
db.complaints.find({ status: "Pending" })

// 5. Find high priority complaints
db.complaints.find({ priority: "High" })

// 6. Find critical complaints
db.complaints.find({ priority: "Critical" })

// 7. Find Internet complaints
db.complaints.find({ category: "Internet" })

// 8. Find complaints from Lab 2
db.complaints.find({ location: "Lab 2" })

// 9. Find resolved complaints
db.complaints.find({ status: "Resolved" })

// 10. Find student by ID
db.complaints.findOne({ studentId: "ST-204" })

// 11. Find all high-priority pending complaints
db.complaints.find({
    priority: "High",
    status: "Pending"
})

// 12. Find complaints created after a date
db.complaints.find({
    createdAt: {
        $gte: new Date("2026-09-24T00:00:00.000Z")
    }
})

// 13. Sort newest first
db.complaints.find().sort({ createdAt: -1 })

// 14. Sort critical first using a simple filter
db.complaints.find({ priority: "Critical" }).sort({ createdAt: -1 })

// 15. Search title containing WiFi
db.complaints.find({
    title: {
        $regex: "wifi",
        $options: "i"
    }
})

// 16. Detect lowercase status problem
db.complaints.find({
    status: {
        $nin: ["Pending", "In Progress", "Resolved"]
    }
})

// 17. Detect lowercase priority problem
db.complaints.find({
    priority: {
        $nin: ["Low", "Medium", "High", "Critical"]
    }
})

// 18. Detect invalid categories
db.complaints.find({
    category: {
        $nin: [
            "Internet",
            "Laptop",
            "Classroom",
            "Electricity",
            "Facilities",
            "Account"
        ]
    }
})

// 19. Fix the intentionally incorrect status
db.complaints.updateOne(
    { complaintId: "CC-2007" },
    { $set: { status: "Pending" } }
)

// 20. Fix the intentionally incorrect priority
db.complaints.updateOne(
    { complaintId: "CC-2008" },
    { $set: { priority: "Medium" } }
)

// 21. Verify fixes
db.complaints.find({
    complaintId: {
        $in: ["CC-2007", "CC-2008"]
    }
})

// 22. Count complaints by status
db.complaints.aggregate([
    {
        $group: {
            _id: "$status",
            count: { $sum: 1 }
        }
    }
])

// 23. Count complaints by category
db.complaints.aggregate([
    {
        $group: {
            _id: "$category",
            count: { $sum: 1 }
        }
    },
    {
        $sort: {
            count: -1
        }
    }
])

// 24. Find duplicate student IDs
db.complaints.aggregate([
    {
        $group: {
            _id: "$studentId",
            count: { $sum: 1 },
            records: { $push: "$complaintId" }
        }
    },
    {
        $match: {
            count: { $gt: 1 }
        }
    }
])
