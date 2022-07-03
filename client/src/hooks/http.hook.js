import { useCallback, useState } from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
		setLoading(true);
		try {


            if (body) {
                body = JSON.stringify (body) // если body есть, то надо его перевести в json формат
                headers['Content-Type'] = 'application/json' // нужно явено указать, что передаем по сети json
            }


			const response = await fetch(url, { method, body, headers });
			const data = await response.json();

			if (!response.ok) {
				throw new Error( data.massage || "Что-то пошло не так");
			}

			setLoading(false);
			return data;

		} catch (err) {
			console.log('📢 [http.hook.js:28]', 'cach', err);
			setLoading(false);
			setError(err);
			throw err;
		}
	}, []);

	const clearError = useCallback(() => {setError(null)},[],)	


	return { loading, request, error, clearError };
};
