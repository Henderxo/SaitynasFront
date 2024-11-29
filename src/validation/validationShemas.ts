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
    photo: 'required',
    description: 'required|minLength10'
}

export const createGame = {
    title: 'required|start|end|minLength4|maxLength25',
    language: 'required|start|end|minLength4|maxLength25',
    platform: 'required',
    controllerSupport: 'required',
    genre: 'required',
    developer: 'required',
    playerType: 'required',
    photo: 'required',
    description: 'required|minLength10'
}

export const editGame = {
    title: 'required|start|end|minLength4|maxLength25',
    language: 'required|start|end|minLength4|maxLength25',
    platform: 'required',
    controllerSupport: 'required',
    genre: 'required',
    developer: 'required',
    playerType: 'required',
    photo: '',
    description: 'required|minLength10'
}

export const editDeveloper = {
    user: 'required',
    developerName: 'required|start|end|minLength4|maxLength25',
    founder: 'required|start|end|minLength4|maxLength25',
    headquarters: 'required|start|end|minLength4|maxLength25',
    date: 'required',
    photo: '',
    description: 'required|minLength10'
}