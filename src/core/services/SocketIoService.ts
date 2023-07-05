import io from 'socket.io-client';

class SocketIoService {
    private socket;

    constructor() {
        this.socket = io('http://localhost:3001');
    }

    connect() {
        this.socket.connect();
    }

    disconnect() {
        this.socket.disconnect();
    }

    listen(eventName, callback) {
        this.socket.on(eventName, callback);
    }

    emit(eventName, data) {
        this.socket.emit(eventName, data);
    }
}

export default new SocketIoService();