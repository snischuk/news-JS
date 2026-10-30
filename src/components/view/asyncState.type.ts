export enum AsyncStatus {
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
    Empty = 'empty',
}

export enum MessageRole {
    Status = 'status',
    Alert = 'alert',
}

export type AsyncState<T> =
    | { status: AsyncStatus.Loading }
    | { status: AsyncStatus.Success; data: T }
    | { status: AsyncStatus.Error; error: Error };
