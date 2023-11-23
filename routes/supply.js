import express from "express";
const router = express.Router();
import verifyToken from "../middleware/protected.js";
import Supply from "../models/supply.js";


const aggregateData = async()=>{
  const combinedData = await Supply.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'customerId', // Replace with the actual common field in the Supply model
        foreignField: '_id', // Replace with the actual common field in the User model
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1, // Exclude _id field if you don't need it
        customerId: 1, // Include fields from the Supply model
        // Add other fields from the Supply model that you want to keep
        remainingAmount:1,
        recievedAmount:1,
        bottlesIn:1,
        bottlesOut:1,
        // Include fields from the User model
        username: '$user.username',
        phone: '$user.phone',
        address: '$user.address',
        // Add other fields from the User model that you want to merge
      },
    },
  ]);
  return combinedData;
}

router.get("/", verifyToken, async (req, res) => {
  // This route is protected and only accessible with a valid token.
  // You can access the user data from req.userData.
  try {
    const data = await aggregateData();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  // This route is protected and only accessible with a valid token.
  // You can access the user data from req.userData.
  try {
    const { id } = req.params;
    const found = await Supply.findById(id);
    res.status(200).json({ data: found });
  } catch (error) {
    res.status(500).json({ error: "Could not found" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req?.userData?.userId;
    const {customerId,bottlesIn,bottlesOut,remainingAmount,recievedAmount } = req.body;
    const created = new Supply({
      userId:userId,
      customerId:customerId,
      bottlesIn: bottlesIn,
      bottlesOut: bottlesOut,
      remainingAmount: remainingAmount,
      recievedAmount: recievedAmount,
    });
    await created.save();
    const data = await aggregateData();

    res.status(201).json({ message: "Registered Successfully", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration Failed" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Supply.findByIdAndUpdate(id, req.body, { new: true });
    // const users = await Supply.find();
    const data = await aggregateData();
    
    res.status(200).json({ message: "Updated Successfully", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Updation Failed" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = await Supply.findByIdAndDelete(id);
    // const users = await Supply.find();
    const data = await aggregateData();

    res.status(200).json({ message: "Deleted Successfully", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Deletion Failed" });
  }
});

export default router;
