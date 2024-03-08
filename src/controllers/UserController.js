import User from "../models/User.js";

async function getUsers(req, res) {
  console.log("Retonro : " + req.body);
  const users = await User.find();
  return res.status(200).json(users);
}

async function createUser(req, res) {
  const user = req.body;

  if (!user.name) {
    return res.status(422).json({ error: "Nome obrigatório" });
  }
  if (!user.email) {
    return res.status(422).json({ error: "Email obrigatório" });
  }
  if (!user.password) {
    return res.status(422).json({ error: "Senha obrigatória" });
  }

  // Check user exist
  const userExist = await User.findOne({ email: user.email });
  if (userExist) {
    return res.status(422).json({ error: "Email já cadastrado" });
  }

  // Create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(user.password, salt);
  user.password = passwordHash;

  try {
    const newUser = await User.create(user);
    return res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Erro interno no servidor, tente novamente mais tarde!" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  // Validate email
  if (!email) {
    return res.status(404).json({ error: "Email obrigatório" });
  }
  if (!password) {
    return res.status(404).json({ error: "Senha obrigatória" });
  }

  // Check password
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(404).json({ error: "Usuário ou senha incorreto" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json( {msg: 'Autenticação realizada com sucesso', token} );

  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Erro interno no servidor, tente novamente mais tarde!" });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  await User.findByIdAndDelete({ _id: id });
  return res.status(200).json({ response: "Usuario deletado" });
}

export { getUsers, createUser, deleteUser, loginUser };
