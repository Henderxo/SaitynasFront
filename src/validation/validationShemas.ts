export const loginShema = {
    email: 'email',
    password: 'required'
}

export const createDeveloper = {
    user: 'required',
    developerName: 'required|start|end|minLength4|maxLength40',
    founder: 'required|start|end|minLength4|maxLength40',
    headquarters: 'required|start|end|minLength4|maxLength40',
    date: 'required',
    photo: 'photoValidation',
    description: 'required|minLength10'
}

export const createGame = {
    title: 'required|start|end|minLength4|maxLength40',
    language: 'required|start|end|minLength4|maxLength25',
    platform: 'required',
    controllerSupport: 'required',
    genre: 'required',
    developer: 'required',
    playerType: 'required',
    photo: 'photoValidation',
    description: 'required|minLength10'
}

export const createUser = {
    username: 'required|start|end|minLength4|maxLength25',
    email: 'email',
    password: 'password|required',
    userType: 'required',
    photo: 'photoValidation',
}

export const createUserSimple = {
    username: 'required|start|end|minLength4|maxLength25',
    email: 'email',
    password: 'password|required',
    photo: 'photoValidation',
}

export const editUser = {
    username: 'required|start|end|minLength4|maxLength25',
    email: 'email',
    password: 'password',
    userType: 'required',
    photo: '',
}

export const editProfile = {
    username: 'required|start|end|minLength4|maxLength25',
    email: 'email',
    password: 'password',
    userType: '',
    photo: '',
}


export const createComment = {
    commentTitle: 'required|start|end|minLength4|maxLength25',
    commentBody: 'required|minLength10'
}

export const editComment = {
    commentTitle: 'required|start|end|minLength4|maxLength25',
    commentBody: 'required|minLength10'
}

export const editGame = {
    title: 'required|start|end|minLength4|maxLength40',
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
    developerName: 'required|start|end|minLength4|maxLength40',
    founder: 'required|start|end|minLength4|maxLength40',
    headquarters: 'required|start|end|minLength4|maxLength40',
    date: 'required',
    photo: '',
    description: 'required|minLength10'
}