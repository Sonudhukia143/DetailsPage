import { User } from "../models/User.js";

const deleteAcc = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'Unable to delete account' });

    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the account' });
  }
};

export default deleteAcc;