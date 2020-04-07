import React from 'react'
import './register.css'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: '',
			isAlredyExist: false,
			nameEmpty: false,
			emailEmpty: false,
			passwordEmpty: false
		}
	}

	onNameChange = (event) => {
		this.setState({nameEmpty: false})
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({emailEmpty: false})
		this.setState({isAlredyExist: false})
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({passwordEmpty: false})
		this.setState({password: event.target.value})
	}



	onSubmitButton = (event) => {

		(this.state.name === '') && this.setState({nameEmpty: true});
		(this.state.email === '') && this.setState({emailEmpty: true});
		(this.state.password === '') && this.setState({passwordEmpty: true});

		if(this.state.name && this.state.email && this.state.password)
		{
			fetch('https://dry-waters-08741.herokuapp.com/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			})
			.then(response => response.json())
			.then(response => {
				// console.log(response)
				if (response === 'unable to register')
				{
					this.setState({isAlredyExist: true})
				}
				else {
					this.props.onRouteChange('signin')
				}
			})
		}
	}

	render() {
		
		let name_text = (this.props.language === 'english') ? 'Name' : 'Имя'
		let email_text = (this.props.language === 'english') ? 'Email Address' : 'Почта'
		let password_text = (this.props.language === 'english') ? 'Password' : 'Пароль'
		let register_text = (this.props.language === 'english') ? 'Register' : 'Зарегистрироваться'
		let error_text = (this.props.language === 'english') ? 'Feel in the field' : 'Заполните поле'
		let error_text2 = (this.props.language === 'english') ? 'Email already exist' : 'Такая почта сущевствует'
		let back_to_sign_in_text = (this.props.language === 'english') ? 'Back to sign in' : 'Перейти ко входу'
		const {email, password, name} = this.state
		return(
		<div className="">
		  <div className="w-100">
		    <label htmlFor="inputName">{name_text}</label>
		    <input 
		    	className={this.state.nameEmpty ? " error pa1" : "pa1"}
		    	type="text" 
		    	value={name} 
		    	style = {{width: 'calc(100% - 6px)'}} 
		    	id="inputName" 
		    	aria-describedby="nameHelp" 
		    	onChange={this.onNameChange}
		    />
		    {this.state.nameEmpty && <p style={{color: 'red', margin: '0'}}>{error_text}</p>}
		  </div>
		  <div className="w-100">
		    <label htmlFor="inputEmail">{email_text}</label>
		    <input 
		    	className={this.state.isAlredyExist || this.state.emailEmpty ? " error pa1" : "pa1"}
		    	type="email" 
		    	value={email} 
		    	style = {{width: 'calc(100% - 6px)'}}  
		    	id="inputEmail" 
		    	aria-describedby="emailHelp" 
		    	onChange={this.onEmailChange}
		    />
		    {this.state.emailEmpty && <p style={{color: 'red', margin: '0'}}>{error_text}</p>}
		    {this.state.isAlredyExist && <p style={{color: 'red', margin: '0'}}>{error_text2}</p>}
		  </div>
		  <div className="w-100">
		    <label className="db" htmlFor="exampleInputPassword1">{password_text}</label>
		    <input 
		    	className={this.state.passwordEmpty ? " error pa1" : "pa1"}
		    	type="password"
		    	value={password} 
		    	style = {{width: 'calc(100% - 6px)'}} 
		    	id="inputPassword"
		    	onChange={this.onPasswordChange}
		    	aria-describedby="passwordHelp"
		    />
		    {this.state.passwordEmpty && <p style={{color: 'red', margin: '0'}}>{error_text}</p>}
		  </div>
		  <button type="submit" className="w-100" onClick={this.onSubmitButton}>{register_text}</button>
		  <button  className="w-100" onClick={() => this.props.onRouteChange('signin')}>{back_to_sign_in_text}</button>
		</div>	
		);
	}
	
}

export default Register


