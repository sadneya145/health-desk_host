import React, {useState, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSocket} from '../Context/SocketProvider';
import './Lobby.css';
import Header from '../../Header/Header';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const LobbyScreen = () => {
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    e => {
      e.preventDefault();
      socket.emit('room:join', {email, room});
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    data => {
      const {email, room} = data;
      navigate(`/video_call/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="lobby-container">
      <Header />
      <div className="content">
        <Navbar />

        <div className="lobby-content">
          
          <form onSubmit={handleSubmitForm}>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="room">Room Number</label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={e => setRoom(e.target.value)}
            />
            <br />
            <button>Join</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LobbyScreen;
