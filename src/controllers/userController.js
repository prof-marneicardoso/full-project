import supabase from "../config/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Cadastro de Usuário
const registerUser = async (request, response) => {
    // Desestruturação do objeto
    const { nome, email, senha } = request.body;

    // Cria um Hash para a senha informada
    const passwordHashed = await bcrypt.hash(senha, 10);

    // Abre a conexão com o Supabase (tabela Users)
    const { data, error } = await supabase.from("users").insert([
        {
            nome,
            email,
            senha: passwordHashed
        }
    ]);

    if (error) {
        return response.status(500).json({
            erro: "Erro:", error
        });
    }

    response.status(201).json({
        mensagem: "Usuário cadastrado com sucesso!"
    });
};

// Login
const authentication = async (request, response) => {
    // Desestruturação do objeto
    const { email, senha } = request.body;

    // Abre a conexão com o Supabase (tabela Users)
    const { data: user, error } = await supabase.from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
        return response.status(401).json({
            mensagem: "Credenciais inválidas"
        });
    }

    // Criptografa a senha enviada e compara com a do DB
    const senhaEnviada = await bcrypt.compare(senha, user.senha);

    if (!senhaEnviada) {
        return response.status(401).json({
            mensagem: "Credenciais inválidas"
        });
    }

    // Gera o Token
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // Devolve o Token gerado
    response.json({ token });
};
