import React from "react";

export const ProfilePage = (props) => {
	return (
		<div className="row profile-block">
			Аватарка храниться в локал сторадж
			<form className="col s12" id='form'>
				<div className="row">
					<div className="input-field col s12">
						<i className="material-icons prefix">account_circle</i>
						<input id="userLogin" type="text" className="validate" data-length="50" onChange={props.inputHandler} />
						<label htmlFor="userLogin">
							{/* {auth.userLogin ? auth.userLogin : 'Введи логин для сохранения'} */}
							Введите логин и нажмите кнопку "Сохранить" для редактирования
						</label>
					</div>
				</div>

				<div className="row">
					<div className="card-action">
						<button className="btn yellow darken-4" onClick={props.saveHandler} disabled={props.loading}>
							Сохранить
						</button>
					</div>
				</div>

				<div className="file-field input-field">
					<div className="btn">
						<span>File</span>
						<input type="file" onChange={props.changeInputFileHandler} />
					</div>
					<div className="file-path-wrapper">
						<input className="file-path validate" type="text" />
						<div className="col s3">
							<img className="circle responsive-img" src={props.preview} alt="" />
						</div>
					</div>
				</div>

				<button className="btn yellow darken-4" onClick={props.saveAvatarHandler} disabled={props.loading}>
					Загрузить
				</button>
			</form>
		</div>
	);
};
