<a name="readme-top"></a>

![issues-shield]
![forks-shield]
![stars-shield]
![license-shield]

<h3 align="center">Hackathon 2022</h3>

  <p align="center">
    Github repo for HackUTD2022 
    <br />
    ·
    <a href="https://github.com/MagnusChase03/Hackathon2022/issues">Report Bug</a>
    ·
    <a href="https://github.com/MagnusChase03/Hackathon2022/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

**Description**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* ![react-shield]
* ![node-shield]
* ![mongo-shield]
* ![docker-shield]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

Before building or running this project, one will need docker installed

1) Go (here)[https://docs.docker.com/engine/install/] and follow instructions on how to set up docker

### Installation

Clone the repo and build all containers from the docker compose file. The mongodb container requires a password to create a root user, so create an `.env` file in the same location as `docker-compose.yml` which contains `MONGO_INITDB_ROOT_PASSWORD=yourpasswordhere`

1) Clone the repo
2) `cd backend`
3) Create `.env` with `MONGO_INITDB_ROOT_PASSWORD=yourpasswordhere`
4) `docker compose build`

## Usage

Run the backend containers

1) `docker compose up`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the GPL License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[issues-shield]: https://img.shields.io/github/issues/MagnusChase03/Hackathon2022?style=for-the-badge
[forks-shield]: https://img.shields.io/github/forks/MagnusChase03/Hackathon2022?style=for-the-badge
[stars-shield]: https://img.shields.io/github/stars/MagnusChase03/Hackathon2022?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/magnuschase03/Hackathon2022?style=for-the-badge
[node-shield]: https://img.shields.io/badge/NodeJS-20232A?style=for-the-badge&logo=node.js
[mongo-shield]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[docker-shield]: https://img.shields.io/badge/Docker-20232A?style=for-the-badge&logo=docker

