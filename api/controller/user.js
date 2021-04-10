const bcrypt = require('bcryptjs')
const AdminDB = require('../modals/user')
const jwt = require('jsonwebtoken')
exports.get = async (req, res) => {
  res.send({ message: 'Success2' })
}

// * Admin Signup
exports.add = async (req, res) => {
  const { name, lastName, email, password } = req.body
  try {
    const hashPwd = await bcrypt.hash(password, 10)

    // * insert value in databse
    const result = new AdminDB({
      name,
      lastName,
      email,
      password: hashPwd,
    })
    await result.save()
    res.status(201).json({
      message: 'Admin Created Suceessfully',
      result: result,
    })
  } catch (err) {
    res.status(500).json({ message: 'error occured please try again later', error: err })
  }
}

// * Login

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const adminCheck = await AdminDB.findOne({ email })

    if (adminCheck === null) {
      return res.status(400).json({ message: 'email not found' })
    }
    const checkPwd = await bcrypt.compare(password, adminCheck.password)
    if (!checkPwd) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }
    const token = jwt.sign(
      {
        email: adminCheck.email,
        id: adminCheck._id,
      },
      process.env.JSW_KEY,
      {
        expiresIn: '10d',
      },
    )
    res.status(200).json({ message: 'Admin Login', token: token, admin: adminCheck })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'error occured please try again later', error: err })
  }
}
