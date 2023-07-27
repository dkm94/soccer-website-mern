/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { CloudinaryImage } from '@cloudinary/url-gen';
import { crop, scale } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { max } from '@cloudinary/url-gen/actions/roundCorners';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';

import { AccountSettings, ProfileSettings } from 'pages/Backoffice/Profile';

import { getProfile } from 'services/queries/public_queries';
import { useEditProfile } from 'services/mutations/Profiles';
import { getUser } from 'services/queries/common_queries';
import { useUpdatePassword } from 'services/mutations/Users';

import avatar from '../../../../src/images/avatar.png';
import './Profile.css';

const Profile = ({ profileId, userId }) => {

	const [ name, setName ] = useState('');
	const [ handle, setHandle ] = useState('');
	const [ intro, setIntro ] = useState('');
	const [ files, setFiles ] = useState('');
	const [ oldFile, setOldFile ] = useState('');
	const [ fileName, setFilename ] = useState('');

	const [ email, setEmail ] = useState('');
	const [ currentPwd, setCurrentPwd ] = useState('');
	const [ newPwd, setNewPwd ] = useState('');
	const [ confirmPwd, setconfirmPwd ] = useState('');
	const [ showPassword, setShowPassword ] = useState(false);

	const [ showModal, setShowModal ] = useState(false);
	const [ modalName, setModalName ] = useState('');
	const [ showPwdSettings, setShowPwdSettings ] = useState(false);

	const [ tempForm, setTempForm ] = useState(null);

	const [ errorObj, setErrorObj ] = useState(null);
	const [ errorMessage, setErrorMessage ] = useState(null);
	const [ openError, setOpenError ] = useState(false);
	const [ openSuccess, setOpenSuccess ] = useState(false);
	const [ successMessage, setSuccessMessage ] = useState(null);

	const editProfileMutation = useEditProfile(
		setSuccessMessage,
		setOpenSuccess,
		setOpenError,
		setErrorMessage,
		setTempForm,
		setErrorObj,
		setFilename
	);

	const updatePasswordMutation = useUpdatePassword();

	const {
		data: profile,
		error,
		isError,
		isLoading,
	} = useQuery({
		staleTime: Infinity,
		queryKey: [ 'profiles' ],
		queryFn: () => getProfile(profileId),
		onSuccess: (data) => {
			const { name, handle, intro, file } = data;
			if (!tempForm) {
				setName(name);
				setHandle(handle);
				setIntro(intro);
				setOldFile(file);
			} else {
				setName(tempForm?.name);
				setHandle(tempForm?.handle);
				setIntro(tempForm?.intro);
				if (tempForm?.file[ 0 ]) {
					setFiles(tempForm?.files);
				}
			}
		},
		keepPreviousData: true,
	});

	const {
		data: currentUser,
		errorCurrentUser,
		isErrorCurrentUser,
		isLoadingCurrentUser,
	} = useQuery({
		staleTime: Infinity,
		queryKey: [ 'users' ],
		queryFn: () => getUser(userId),
		onSuccess: (data) => {
			const { email } = data;
			setEmail(email);
		},
	});

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const openModal = (componentName) => {
		setShowModal(true);
		setModalName(componentName);
	};

	const handleClose = (event) => {
		setOpenSuccess(false);
		setOpenError(false);
	};

	const submitProfile = (e) => {
		e.preventDefault();
		editProfileMutation.mutate({
			_id: profileId,
			name,
			handle,
			intro,
			file: files, 
		}, profileId);
	};

	const submitPassword = (e) => {
		e.preventDefault();
		updatePasswordMutation.mutate({
			_id: profileId,
			password: currentPwd,
			newPwd,
			confirmPwd, 
		}, profileId);
	};

	const handleImage = async (e) => {
		const img = e.target.files[ 0 ];
		const base64 = await convertToBase64(img);
		setFilename(img.name);
		setFiles(base64);
	};

	const convertToBase64 = (img) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const helperText = (field) => errorObj?.messages[ field ];
	const catchError = (field) => {
		if (errorObj?.messages) {
			return field in errorObj.messages;
		}
	};

	const imageSrc = profile?.file?.public_id;

	const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' })
		.resize(crop().width(400).height(400).gravity(focusOn(face())))
		.roundCorners(max())
		.resize(scale().width(200))
		.delivery(format(auto()));

	return (
		<div
			className="profile-settings"
		>
			<ProfileSettings
				submitProfile={submitProfile}
				profile={profile}
				avatar={avatar}
				myImage={myImage}
				name={name}
				setName={setName}
				helperText={helperText}
				catchError={catchError}
				handle={handle}
				setHandle={setHandle}
				intro={intro}
				handleImage={handleImage}
				files={files}
				fileName={fileName}
				setIntro={setIntro}
				successMessage={successMessage}
				errorMessage={errorMessage}
				openSuccess={openSuccess}
				openError={openError}
				handleClose={handleClose}
				mutation={editProfileMutation}
			/>
			<AccountSettings
				email={email}
				setEmail={setEmail}
				setShowPwdSettings={setShowPwdSettings}
				showPwdSettings={showPwdSettings}
				currentPwd={currentPwd}
				setCurrentPwd={setCurrentPwd}
				helperText={helperText}
				catchError={catchError}
				confirmPwd={confirmPwd}
				setconfirmPwd={setconfirmPwd}
				newPwd={newPwd}
				setNewPwd={setNewPwd}
				showModal={showModal}
				setShowModal={setShowModal}
				openModal={openModal}
				modalName={modalName}
				userId={userId}
				submitPassword={submitPassword}
				showPassword={showPassword}
				mutation={updatePasswordMutation}
				handleClickShowPassword={handleClickShowPassword}
				handleMouseDownPassword={handleMouseDownPassword}
			/>
		</div>
	);
};

export default Profile;
