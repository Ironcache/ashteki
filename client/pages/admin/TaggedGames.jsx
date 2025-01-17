import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { loadTaggedGames } from '../../redux/actions';
import Panel from '../../Components/Site/Panel';
import { Button, Form } from 'react-bootstrap';

const TaggedGames = () => {
    const dispatch = useDispatch();
    const taggedGames = useSelector((state) => state.games.taggedGames);
    const [tag, setTag] = useState('');
    const [term, setTerm] = useState(1);

    const onSubmitClick = (event) => {
        dispatch(loadTaggedGames(tag, term));
        event.stopPropagation();
    };

    const doShortcut = (event) => {
        setTag(event.target.value);
        dispatch(loadTaggedGames(event.target.value, term));
        event.stopPropagation();
    };

    const handleTermChange = (event) => {
        setTerm(event.target.value);
        dispatch(loadTaggedGames(tag, event.target.value));
        event.stopPropagation();
    };

    const computeWinner = (game) => {
        if (
            !game.winner ||
            game.winner === game.players[0].name ||
            game.winner === game.players[1].name
        ) {
            return game.winner;
        }

        if (game.winner === game.players[0].deck) {
            return game.players[0].name;
        }

        if (game.winner === game.players[1].deck) {
            return game.players[1].name;
        }
    };

    const computeWinnerIndex = (game) => {
        return game.winner === game.players[0].name ? 0 : 1;
    };

    const gameApiRoot = `${window.location.protocol}//${window.location.host}/api/game/`;

    let myGames = taggedGames
        ? taggedGames.map((game) => {
            const startedAt = moment(game.startedAt);
            const finishedAt = moment(game.finishedAt);
            const duration = moment.duration(finishedAt.diff(startedAt));

            const winnerIndex = game.winner ? computeWinnerIndex(game) : -1;

            return (
                <tr key={game.gameId}>
                    <td>{moment(game.startedAt).format('YYYY-MM-DD HH:mm')}</td>
                    <td>
                        {game.players[0]?.name}
                        <br />
                        {game.players[0]?.deck}
                    </td>
                    <td style={{ 'white-space': 'nowrap' }}>
                        {game.players[1]?.name}
                        <br />
                        {game.players[1]?.deck}
                    </td>
                    <td>
                        {computeWinner(game)}
                        <br />({game.winReason})
                    </td>
                    <td style={{ 'white-space': 'nowrap' }}>
                        {game.players[winnerIndex]?.wounds}
                    </td>
                    <td style={{ 'white-space': 'nowrap' }}>
                        <a href={gameApiRoot + game.gameId} download={true}>
                            {game.gameId}
                        </a>
                        <br />
                        {duration.get('minutes')}m {duration.get('seconds')}s
                    </td>
                </tr>
            );
        })
        : null;

    let table =
        taggedGames && taggedGames.length === 0 ? (
            <div>No matching games.</div>
        ) : (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Winner</th>
                        <th>Blood Points</th>
                        <th>details</th>
                    </tr>
                </thead>
                <tbody>{myGames}</tbody>
            </table>
        );

    return (
        <div className='col-sm-offset-1 profile full-height'>
            <Panel title={'Tagged Games'}>
                <Form
                    inline
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitClick(e);
                    }}
                >
                    <div >
                        <Button variant='primary' className='def' onClick={doShortcut} value='PHX'>
                            PHX
                        </Button>
                        <Button variant='primary' className='def' onClick={doShortcut} value='FFL'>
                            FFL
                        </Button>
                        <Form.Control
                            name='tag'
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder='Enter a tag'
                        />
                        <Button variant='primary' className='def' onClick={onSubmitClick}>
                            Search
                        </Button>
                        <select className='form-control' onChange={handleTermChange} value={term}>
                            <option value='0'>All games</option>
                            <option value='1'>Last 1 month</option>
                            <option value='3'>Last 3 months</option>
                            <option value='12'>Last 12 months</option>
                        </select>
                    </div>
                </Form>
                {table}
            </Panel>
        </div>
    );
}

export default TaggedGames;