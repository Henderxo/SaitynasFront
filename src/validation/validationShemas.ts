export const loginShema = {
    email: 'email',
    password: 'password'
}

export const createDeveloper = {
    user: 'required',
    developerName: 'required|start|end|minLength4|maxLength25',
    founder: 'required|start|end|minLength4|maxLength25',
    headquarters: 'required|start|end|minLength4|maxLength25',
    date: 'required',
    photo: 'required'
}