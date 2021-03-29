function authReducer(currentState = null, action) {
	switch (action.type) {
		case "CREATE_USER_RESOLVED":
			return action.user;
		default:
			return currentState;
	}
}

export default authReducer;
