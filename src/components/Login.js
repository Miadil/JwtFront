import axios from "axios"

// import "./Login.css"

const onSubmit = (e) => {
	e.preventDefault()
	console.log("onSubmit")
	axios
		.post("http://localhost:3030/auth/signin", {
			username: e.target.name.value,
			password: e.target.password.value,
		})
		.then((res) => {
			console.log(res)
			localStorage.setItem("token", res.headers["x-access-token"])
			console.log("token", localStorage.getItem("token"))
		})
}

const protectedRoute = () => {
	const token = localStorage.getItem("token")
	axios({
		method: "POST",
		url: "http://localhost:3030/auth/protected",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => {
		console.log(res) //reste a ajouter les redirection si  token valide
	})
}

const Login = ({ name, id, login }) => {
	return (
		<div className="contentGlob">
			<div className="login">
				<form onSubmit={onSubmit}>
					<input type="text" name="name" />
					<input type="password" name="password" />
					<button type="submit">Login</button>
				</form>
				<button onClick={() => protectedRoute()}>Test protectedRoute</button>
			</div>
		</div>
	)
}

export default Login
