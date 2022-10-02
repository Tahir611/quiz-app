export const getQuestionApi = async (totalQuestions: number, level: string) => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
    const {results} = await res.json();
    return results
}
