declare module amf {
    class Client {
        constructor(destination, endpoint, timeout);
        invoke(source, operation, params, onResult, onStatus, token, holdQueue): void;
    }
    
    class Writer {
        constructor();
        reset();
    }
}