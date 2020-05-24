import React from 'react'
import './signin.css'
import Loader from '../../components/Loader/Loader'

class SignIn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			isUserNotFound: false,
			rememberMe: false,
			isCheckCredential: false
		}
	}


	componentDidMount() {
		if(localStorage.getItem('userId'))
		{
				let user = {
					id: localStorage.getItem('userId'),
					name: localStorage.getItem('userName'),
					entries: localStorage.getItem('userEntries')
				}
				this.props.onRouteChange('home-page')
				this.props.onUserIdChange(user.id)
				this.props.onUserNameChange(user.name)
				this.props.onEntriesChange(user.entries)
		}
	}

	onEmailChange = (event) => {
		this.setState({isUserNotFound: false})
		this.setState({email: event.target.value})

	}

	onPasswordChange = (event) => {
		this.setState({isUserNotFound: false})
		this.setState({password: event.target.value})
	}

	toogleRemeberMe = () => {
		this.setState({rememberMe: !this.state.rememberMe})
	}

	onSubmitButton = (event) => {
		event.preventDefault();
		this.setState({isCheckCredential: true})
		fetch('https://dry-waters-08741.herokuapp.com/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {
			this.setState({isCheckCredential: false})
			if (user.id)
			{
				this.props.onRouteChange('home-page')
				this.props.onUserIdChange(user.id)
				this.props.onUserNameChange(user.name)
				this.props.onEntriesChange(user.entries)
				if (this.state.rememberMe)
				{
					localStorage.setItem('userName', user.name)
					localStorage.setItem('userEntries', user.entries)
					localStorage.setItem('userId', user.id)
				}
			}
			else {
				this.setState({isUserNotFound: true})
			}
		})
		
	}

	render() {

		const {email, password} = this.state

		let email_text = (this.props.language === 'english') ? 'Email Address' : 'Почта'
		let password_text = (this.props.language === 'english') ? 'Password' : 'Пароль'
		let register_text = (this.props.language === 'english') ? 'Register' : 'Регистрация'
		let signin_text = (this.props.language === 'english') ? 'Sign In' : 'Войти'
		let error_text = (this.props.language === 'english') ? 'Email or password are incorrect' : 'Неправильный пароль или почта'
		let member_text = (this.props.language === 'english') ? 'Not a member?' : 'Еще нет аккаунта?'
		let Remember_me_text = (this.props.language === 'english') ? 'Remember me?' : 'Запомнить меня'

		return(
		<form className="signin" onSubmit={this.onSubmitButton}>
		  <div className="w-100">
		    <label htmlFor="inputEmail">{email_text}</label>
		    <input 
		    	className={this.state.isUserNotFound ? "pa1 error" : "pa1"}
		    	type="email" 
		    	value={email} 
		    	style = {{width: 'calc(100% - 6px)'}} 
		    	id="inputEmail" 
		    	onChange={this.onEmailChange}
		    />
		  </div>
		  <div className="w-100">
		    <label htmlFor="exampleInputPassword1">{password_text}</label>
		    <input 
		    	className={this.state.isUserNotFound ? "pa1 error" : "pa1"}
		    	type="password"
		    	value={password} 
		    	style = {{width: 'calc(100% - 6px)'}} 
		    	id="inputPassword"
		    	onChange={this.onPasswordChange}
		    />
		  </div>
		  <button type="submit" style={{width: '100%'}}>
		  		<div style={{position: 'relative'}}>
					<p style={{margin: 0}}>{signin_text}</p>
					{(this.state.isCheckCredential) && <Loader styleOn={'buttonloader'} style={{position: 'absolute', right: 0, top: 0}}/>}
			    </div>
		  </button>
		  <div className="flex justify-content-center align-items-center"> 	
		  	<input name="remember me" type="checkbox" checked={this.state.rememberMe} onChange={this.toogleRemeberMe}/>
  			<label style={{fontSize: '0.85rem'}} for="remember me">{Remember_me_text}</label>
		  </div>
		  <div className="flex justify-content-center align-items-center"> 	
		  	<p style={{fontSize: '0.85rem'}}>{member_text}</p> 
		  	<button style={{textDecoration: 'underline', border: 'none', background: 'none', padding: '0', margin: '16px 0 17px 5px', color: '#000343'}}
		  			onClick={() => this.props.onRouteChange('register')}>{register_text}</button>
		  </div>
		  {this.state.isUserNotFound && <p style={{color: 'red'}}>{error_text}</p>}
		</form>	
		);
	}
	
}

export default SignIn

