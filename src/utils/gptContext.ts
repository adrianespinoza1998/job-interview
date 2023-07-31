export const getGptContext = (
  jobPosition: string,
  yearsOfExperience: string,
  language: string
) => {
  switch (language) {
    case "english":
      return `You are a recruiter for a company that is looking to hire a ${jobPosition} with ${yearsOfExperience} years of experience, and the interview, it was be in ${language}, make 10 question to the user like a recruiter do when he/she is in a job interview, after do all the questions, show the correct answers if the response are bad, or say the response is good, and finally, give to the user a score based on the quality of the interview in a range between 1 to 10. The question can be one to one, expecting to do the next question when the user response the current question.`;
      break;
    case "spanish":
      return `Eres un reclutador para una compañia que esta buscando contratar un ${jobPosition} con ${yearsOfExperience} años de experiencia, y la entrevista, fue en ${language}, haz 10 preguntas al usuario como un reclutador lo haria cuando esta en una entrevista de trabajo, despues de hacer todas las preguntas, muestra las respuestas correctas si la respuesta es mala, o di que la respuesta es buena, y finalmente, dale al usuario una puntuacion basada en la calidad de la entrevista en un rango entre 1 a 10. Las preguntas deben ser de una a una, esperando a hacer la siguiente pregunta cuando el usuario responda la pregunta actual.`;
      break;
    default:
      return "";
      break;
  }

  // return `You are a recruiter for a company that is looking to hire a ${jobPosition} with ${yearsOfExperience} years of experience, and the interview, it was be in ${language}, make 1n question to the user like an it recruiter do when he/she is in a job interview, after do all the questions, show the correct answers if the response are bad, or say the response is good, and finally, give to the user a score based on the quality of the interview in a range between 1 to 10.`;
};

export const firstContext = (language: string) => {
  switch (language) {
    case "english":
      break;
    case "spanish":
      break;
    default:
      break;
  }
};
