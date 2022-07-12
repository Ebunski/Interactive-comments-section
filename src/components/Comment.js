import React from 'react';
import { useGlobalContext } from '../context';
import Markdown from './Markdown';
import TimeAgo from 'react-timeago';

export default function Comment(props) {
	const {
		//functions
		vote,
		changeAction,
		handleDelete,

		//icons
		plus,
		minus,
		reply,
		del,
		edit,

		//states
		currUser,
		currId,
		actionType,
	} = useGlobalContext();
	const {
		id,
		content,
		createdAt,
		score,
		user,
		replies = [],
		replyingTo = '',
		parentId = null, //used to place the replies
	} = props;

	// Added this path to the front all images.... :) :) :)
	const PUBLIC_URL = process.env.PUBLIC_URL + '/';

	const fiveMinutes = 300000;
	const timeElapsed = new Date() - new Date(createdAt) > fiveMinutes;
	const authentication = user.username === currUser.username;
	const canEdit = authentication && !timeElapsed;

	const replyId = parentId ? parentId : id; //passed to markdown to place reply

	const replyList = replies.map((x) => (
		<Comment key={x.id} {...x} replyingTo={x.replyingTo} parentId={id} />
	)); //-----------***recursive***---------//

	function formatter(value, unit, suffix) {
		if (unit === 'second') return 'Just now';
		if (value > 1) return `${value} ${unit}s ${suffix}`;
		return `${value} ${unit} ${suffix}`;
	}

	/*
=============== 
update styles for num


Comment component
===============
*/

	return (
		<>
			{/*To fix article-li dispute*/}
			<article data-aos="fade-right" className="comment">
				<div className="likes">
					<button className="plus" onClick={() => vote(id, 'plus')}>
						<svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
								fill="#C5C6EF"
							/>
						</svg>
					</button>

					<p className="num">{score}</p>

					<button className="minus" onClick={() => vote(id, 'minus')}>
						<svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
								fill="#C5C6EF"
							/>
						</svg>
					</button>
				</div>

				<div className="identity">
					<img
						className="avatar"
						src={PUBLIC_URL + user.image.png}
						alt={user.username}
					/>
					<div className="name">{user.username}</div>
					{/* ---style this----(displays if its current user)*/}
					{authentication && <button>you</button>}
				</div>
				<div className="time">
					<TimeAgo date={createdAt} formatter={formatter} />
				</div>

				{/* renders edit and delete if five minutes has not elapsed and it is the user id */}
				{canEdit ? (
					<div className="edit-delete">
						<button className="delete" onClick={() => handleDelete(id)}>
							<img src={del} alt="icon-delete" />
							<span>Delete</span>
						</button>

						<button className="edit" onClick={() => changeAction(id, 'edit')}>
							<img src={edit} alt="icon-edit" />
							<span>Edit</span>
						</button>
					</div>
				) : (
					// ---------------otherwise renders reply button--------------------//
					<button
						className="reply-button"
						onClick={() => changeAction(id, 'reply')}
					>
						<img src={reply} alt="icon-reply" />
						<span>Reply</span>
					</button>
				)}
				{/*--------Here, displays the markdown if its in editing state else displays the comment-content----*/}
				<div className="content">
					{/* --Cat---This still not working for new comments o---- */}
					{replyingTo !== '' && <span>@{replyingTo} </span>} {/* if a reply */}
					{actionType === 'edit' && currId === id ? (
						<Markdown label="update" initialText={content} />
					) : (
						<p>{content}</p>
					)}
				</div>
			</article>
			{/*---------renders markdown when reply is clicked and id is ID of the card------------------*/}
			{actionType === 'reply' && currId === id && (
				<Markdown label="reply" replyId={replyId} />
			)}
			{/*--------------replies ---------------------------*/}
			{replies.length > 0 && <div className="reply-section">{replyList}</div>}
		</>
	);
}
