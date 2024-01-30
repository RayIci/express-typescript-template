export default interface LoggerInterface {
    info: (content: any) => void;
    warn: (content: any) => void;
    error: (content: any) => void;
}