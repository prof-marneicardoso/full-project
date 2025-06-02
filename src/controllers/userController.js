import supabase from "../config/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (request, response) => {
    // Desestruturação do objeto
    const { nome, email, senha } = request.body;

    // Cria um Hash para a senha informada
    const passwordHashed = await bcrypt.hash(senha, 10);

    // Abre a conexão com o Supabase (tabela Users)
    const {} = await supabase.from('users').insert([
        {
            nome,
            email,
            senha: passwordHashed
        }
    ]);

    if () {
        return response.status(500)
    }
};