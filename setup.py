from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in my_testapp/__init__.py
from my_testapp import __version__ as version

setup(
	name="my_testapp",
	version=version,
	description="Test the app",
	author="Mark",
	author_email="mark@mail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
