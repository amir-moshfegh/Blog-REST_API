status = {
    DISABLE: 'disable',
    ENABLE: 'enable',
}

roles = {
    ADMIN: 'admin',
    BLOGGER: 'blogger',
    USER: 'user',
}

permission = {
    // admin
    GET_USERS: 'getUsers',
    MANAGE_USERS: 'manageUsers',
    CHANGE_STATUS_POST: 'changeStatusPost',
    CHANGE_STATUS_COMMENT:'changeStatusComment',

    // bloger
    GET_POSTS: 'getPosts',
    MANAGE_POSTS: 'managePosts',

    // user
    MANAGE_COMMENT: 'manageComment',
    GET_COMMENT: 'getComment',
}

module.exports = {
    status,
    roles,
    permission,
}