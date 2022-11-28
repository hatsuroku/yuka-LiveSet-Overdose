import os
from os import path

def renameFromOne(folder):
    for idx, file in enumerate([f for f in os.listdir(folder) if not f.startswith('.')], 1):
        # print(path.join(folder, file))
        # print(path.join(folder, f'{idx}{path.splitext(file)[-1]}'))
        # print('--------------')
        os.rename(path.join(folder, file), path.join(folder, f'{idx}{path.splitext(file)[-1]}'))

def main():
    renameFromOne(path.realpath(path.join(path.dirname(__file__), '..', 'public', 'img')))
    
if __name__ == '__main__':
    main()