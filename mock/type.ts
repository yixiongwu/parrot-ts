export function CreateResult(data, success: boolean = true, error: string | null = null) {
    return { success: success, data: data, error: error };
}