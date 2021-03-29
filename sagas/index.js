import { client } from "../utils/api-client";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* createUser(action) {
	try {
		const {
			data: { user },
		} = yield call(client, "/api/v1/auth/signup", {
			data: action.payload.data,
		});

		yield put({ type: "CREATE_USER_RESOLVED", user });
	} catch (err) {}
}

function* mySaga() {
	yield takeEvery("CREATE_USER_REQUESTED", createUser);
}

export default mySaga;
