# Addon Translate Browser

Extension pour navigateur _surtout tester sur Firefox pour le moment_ permettant de traduire en français les sous-titres en anglais des vidéos du site [GameDev](https://www.gamedev.tv).

## Pour commencer

Avec l'utilisation de [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) pour la traduction.
De Python pour l'utilisation de LibreTranslate.

### Pré-requis

- Le projet ici-même
- Votre navigateur _Pour le moment tester uniquement sur Firefox_
- Python 3.11 [Téléchargeable ici](https://www.python.org/ftp/python/3.11.4/python-3.11.4-amd64.exe)
- [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) _Qui se mettra en place via Python_
- Ajouter ICU_VERSION à

### Installation LibreTranslate

Conception d'un environnement virtuel

```bash
py -3.11 -m venv NOM_ENV
```

Activer l'environnement

```bash
NOM_ENV\Scripts\activate
```

Installer LibreTranslate

```bash
pip install libretranslate
```
