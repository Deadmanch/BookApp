import { DivComponent } from '../../common/div-component.js';
import './card.css';

export class Card extends DivComponent {
	constructor(appState, cardState) {
		super();
		this.appState = appState;
		this.cardState = cardState;
	}
	#shortDescription(str, len = 300) {
		if (str.trim().length <= len) {
			return str.trim();
		}
		return (
			str
				.trim()
				.substr(0, len - 3)
				.trim() + '...'
		);
	}
	#addFavorites() {
		this.appState.favorites.push(this.cardState);
	}
	#deleteFromFavorites() {
		this.appState.favorites = this.appState.favorites.filter(b => b.key !== this.cardState.key);
	}

	render() {
		const description =
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet bibendum leo. Proin laoreet tellus et magna accumsan, eu vehicula sem volutpat. Ut luctus faucibus convallis. Quisque quam erat, tristique in sem eu, scelerisque posuere libero. Etiam tincidunt massa ut nulla tincidunt semper ac vel turpis. In sed pulvinar orci, at accumsan nisl.';
		this.el.classList.add('card');
		const existInFavorites = this.appState.favorites.find(b => b.key === this.cardState.key);
		this.el.innerHTML = `
		<div class="card__wrapper">
		<div class="card__img">
				<img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Обложка" />
			</div>
			<div class="card__info">
				<h2 class="card__title">${this.cardState.title}</h2>
				<div class="card__author"><span>Автор: </span>
				${this.cardState.author_name ? this.cardState.author_name.join(' / ') : 'Не задано'}
				</div>
				<div class="card__category"><span>Категория: </span>
				${this.cardState.subject ? this.cardState.subject[0] : 'Не задано'}
				</div>
				<div class="card__description">
				<p>${this.#shortDescription(description)}
				</p>
				</div>
			</div>
		</div>
			<div class="card__add-favorites">
					<button class="button_add ${existInFavorites ? 'button__active' : ''}">
						${
							existInFavorites
								? `<svg width="34" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="34" height="34" transform="translate(0.0527954)" fill="none"/>
<path d="M9.0528 7.82353C9.0528 6.26414 10.2467 5 11.7195 5H22.3861C23.8589 5 25.0528 6.26414 25.0528 7.82353V29L17.0528 20.5294L9.0528 29V7.82353Z" fill="#E3A061"/>
</svg>`
								: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 7.82353C9 6.26414 10.1939 5 11.6667 5H22.3333C23.8061 5 25 6.26414 25 7.82353V29L17 20.5294L9 29V7.82353Z" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
						}
					</button>
			</div>
		`;
		if (existInFavorites) {
			this.el.querySelector('button').addEventListener('click', this.#deleteFromFavorites.bind(this));
		} else {
			this.el.querySelector('button').addEventListener('click', this.#addFavorites.bind(this));
		}
		return this.el;
	}
}
