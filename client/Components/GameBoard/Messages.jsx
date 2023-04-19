import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import Avatar from '../Site/Avatar';
import AlertPanel from '../Site/AlertPanel';

import './Messages.scss';

const Messages = ({ messages, onCardMouseOver, onCardMouseOut }) => {
    const owner = useSelector(
        (state) => state.lobby.currentGame.players[state.lobby.currentGame.owner]
    );

    // doesn't work in lobby mode - only game
    const playersLookup = useSelector((state) => {
        const pHolder = {};
        for (const player in state.lobby.currentGame.players) {
            const p = state.lobby.currentGame.players[player];
            const item = {
                name: p.name,
                argType: p.argType,
                avatar: p.avatar
            };
            if (p.user) {
                item.role = p.user.role;
                item.faveColor = p.user.faveColor;
            }
            pHolder[p.name] = item;
        }
        return pHolder;
    });

    const getMessage = () => {
        return messages.map((message, index) => {
            let className = classNames('message', {
                'this-player': message.activePlayer && message.activePlayer == owner.name,
                'other-player': message.activePlayer && message.activePlayer !== owner.name,
                'chat-bubble': Object.values(message.message).some(
                    (m) => m.name && m.argType === 'player'
                )
            });
            return (
                <div key={index} className={className}>
                    {formatMessageText(message.message)}
                </div>
            );
        });
    };

    const formatPlayerChatMsg = (fragment, index) => {
        const user = playersLookup[fragment.name];
        if (!user) {
            return '_not found_';
        }

        let userClass =
            'username' + (user.role ? ` ${user.role.toLowerCase()}-role` : '');
        let userStyle = {};
        if (user.faveColor) {
            userStyle.color = user.faveColor;
        }
        return (
            <div key={index++} className='message-chat'>
                <Avatar imgPath={user.avatar} float />
                <span key={index++} className={userClass} style={userStyle}>
                    {user.name}
                </span>
            </div>
        );
    }

    const formatplayerNameFragment = (fragment, index) => {
        const user = playersLookup[fragment.name];
        if (!user) {
            return '_not found_';
        }
        let userClass =
            'username' + (user.role ? ` ${user.role.toLowerCase()}-role` : '');
        let userStyle = {};
        if (user.faveColor) {
            userStyle.color = user.faveColor;
        }
        return (
            <span key={index++} className={userClass} style={userStyle}>
                {user.name}
            </span>
        );
    }

    const formatMessageText = (message) => {
        let index = 0;
        let messages = [];

        for (const [key, fragment] of Object.entries(message)) {
            if (fragment === null || fragment === undefined) {
                messages.push('');

                continue;
            }

            if (key === 'alert') {
                let message = formatMessageText(fragment.message);

                switch (fragment.type) {
                    case 'endofround':
                    case 'phasestart':
                        messages.push(
                            <div
                                className={'font-weight-bold text-white separator ' + fragment.type}
                                key={index++}
                            >
                                <hr className={'mt-2 mb-2' + fragment.type} />
                                {message}
                            </div>
                        );
                        break;
                    case 'startofround':
                        messages.push(
                            <div
                                className={'font-weight-bold text-white separator ' + fragment.type}
                                key={index++}
                            >
                                {message}
                            </div>
                        );
                        break;
                    case 'success':
                        messages.push(
                            <AlertPanel type='success' key={index++}>
                                {message}
                            </AlertPanel>
                        );
                        break;
                    case 'info':
                        messages.push(
                            <AlertPanel type='info' key={index++}>
                                {message}
                            </AlertPanel>
                        );
                        break;
                    case 'danger':
                        messages.push(
                            <AlertPanel type='danger' key={index++}>
                                {message}
                            </AlertPanel>
                        );
                        break;
                    case 'warning':
                        messages.push(
                            <AlertPanel type='warning' key={index++}>
                                {message}
                            </AlertPanel>
                        );
                        break;
                    default:
                        messages.push(message);
                        break;
                }
            } else if (fragment.message) {
                messages.push(formatMessageText(fragment.message));
            } else if (fragment.link && fragment.label) {
                messages.push(
                    <a key={index++} href={fragment.link} target='_blank' rel='noopener noreferrer'>
                        {fragment.label}
                    </a>
                );
            } else if (fragment.argType === 'card') {
                const indexLabel = fragment.index > 0 ? ' (' + fragment.index + ')' : '';
                messages.push(
                    <span
                        key={index++}
                        className='card-link'
                        onMouseOver={onCardMouseOver.bind(this, fragment)}
                        onMouseOut={onCardMouseOut.bind(this)}
                    >
                        {fragment.name + indexLabel}
                    </span>
                );
            } else if (fragment.name && fragment.argType === 'player') {
                messages.push(formatPlayerChatMsg(fragment, index));

            } else if (fragment.argType === 'nonAvatarPlayer') {
                messages.push(formatplayerNameFragment(fragment, index));

            } else if (fragment.argType === 'die') {
                let diceFont = 'phg-basic-magic';

                if (fragment.magic && fragment.level && fragment.level !== 'basic') {
                    diceFont = `phg-${fragment.magic}-${fragment.level}`;
                }
                let dieClass = classNames('chat-die', fragment.magic);

                messages.push(
                    <span key={index++} className={dieClass}>
                        <span className={diceFont} title={`${fragment.name}`}></span>
                    </span>
                );
            } else {
                let messageFragment = fragment.toString();
                messages.push(
                    <span key={index++} className='message-fragment'>
                        {messageFragment}
                    </span>
                );
            }
        }

        return messages;
    };

    return <div>{getMessage()}</div>;
};

Messages.displayName = 'Messages';

export default Messages;
