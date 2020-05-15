export interface PlanetType {
  id: string;
  name: string;
  population: string;
  rotationPeriod: string;
  diameter: string;
}

export interface StarshipType {
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: string;
  length: string;
  crew: string;
  passengers: string;
  cargoCapacity: string;
}

export interface PersonType {
  name: string;
  gender: string;
  birthYear: string;
  eyeColor: string;
}

interface ApiPlanetType {
    name: string;
    population: string;
    rotation_period: string;
    diameter: string;
    url: string;
}

interface ApiStarshipType {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    url: string;
}

interface ApiPersonType {
    name: string;
    gender: string;
    birth_year: string;
    eye_color: string;
    url: string;
}

export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img/';
  
    async getResource(url: string) {
      const result = await fetch(`${this._apiBase}${url}`);
      if (!result.ok) {
        throw new Error(`Could not fetch ${url},
          received ${result.status}.
        `);
      }
      const body = await result.json();
      return body;
    }
  
    getAllPeople = async () => {
      const result = await this.getResource(`/people/`);
      return result.results.map(this._transformPerson);
    }
  
    getPerson = async (id: number) => {
      const person = await this.getResource(`/people/${id}`);
      return this._transformPerson(person);
    }
  
    getAllPlanets = async () => {
      const result = await this.getResource(`/planets/`);
      return result.results.map(this._transformPlanet);
    }
  
    getPlanet = async (id: number) => {
      const planet = await this.getResource(`/planets/${id}`);
      return this._transformPlanet(planet);
    }
  
    getAllStarships = async () => {
      const result = await this.getResource(`/starships/`);
      return result.results.map(this._transformStarship);
    }
  
    getStarship = async (id: number) => {
      const starship = await this.getResource(`/starships/${id}`);
      return this._transformStarship(starship);
    }
  
    getPersonImage = ({id}: {id: number}) => {
      return `${this._imageBase}characters/${id}.jpg`;
    }
  
    getPlanetImage = ({id}: {id: number}) => {
      return `${this._imageBase}planets/${id}.jpg`;
    }
  
    getStarshipImage = ({id}: {id: number}) => {
      return `${this._imageBase}starships/${id}.jpg`;
    }
  
    _extractId(item: {url: string}) {
      const idRegex = /\/([0-9]*)\/$/;
      const match = item.url.match(idRegex);
      if (match) {
          return match[1];
      }
      return '';
    }
  
    _transformPlanet = (planet: ApiPlanetType) => {
      return {
        id: this._extractId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter,
      }
    }
  
    _transformStarship = (starship: ApiStarshipType) => {
      return {
        id: this._extractId(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargo_capacity
      };
    }
  
    _transformPerson = (person: ApiPersonType) => {
      return {
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color
      };
    }
  }