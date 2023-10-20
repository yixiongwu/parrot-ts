export function CreateResult(data, success: boolean = true, error: string | null = null) {
    return { Success: success, Data: data, Error: error };
}