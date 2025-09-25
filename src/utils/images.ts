export function getImageUrl(googleUrl: string): string {
	if (!googleUrl || !googleUrl.startsWith('https://lh5.googleusercontent.com/p/')) {
		return '';
	}

	const match = googleUrl.match(/=s(\d+)-w(\d+)-h(\d+)-k-no/);
	if (match) {
		return googleUrl.replace(match[0], '=w1000-h1000-k-no');
	}
	return googleUrl.split('=')[0] + '=w1000-h1000-k-no';
}