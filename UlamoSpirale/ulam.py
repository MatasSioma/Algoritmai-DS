from math import sqrt
from PIL import Image
import numpy as np

# Spirales didzio pasirinkimas:
while True:
    try:
        dim = int(input("Spirales dydis? (n^2): "))
        if dim % 2 != 0 and dim >= 3:
            break
    except:
        continue

# Pirminio skaiciaus radimas:
# https://www.geeksforgeeks.org/prime-numbers/
def isPrime(n):
    if (n <= 1):
        return False
 
    for i in range(2, int(sqrt(n))+1):
        if (n % i == 0):
            return False
 
    return True


def execPath(path):
    global points, pointer, d
    index = 0
    if path[index] == 0:
        index = 1
    if(path[index] > 0): factor = 1 
    else: factor = -1
    for n in range(1, abs(path[index])+1):
        pointer[index] = pointer[index] + factor
        d += 1
        if isPrime(d):
            points[pointer[0]][pointer[1]] = True

points = np.full((dim, dim), False)
pointer = [int((dim-1)/2), int((dim-1)/2)] # rodo i centra
d = 1
i = 1

while True:
    # https://math.stackexchange.com/questions/768198/how-to-create-alternating-series-with-happening-every-two-terms
    # Seka kur zenklas keistusi kas 2 narius ->
    a = (i + 1) % 2 # seka 010101010101...
    b = a * i / 2 # seka 010203040506...
    y = int((-1)**((i**2+i+2)/2) * -b)

    a = i % 2
    b = a * ((i + 1) / 2)
    x = int((-1)**((i**2+i+2)/2) * b)

    execPath((y,x))
    
    i += 1
    if d >= dim**2:
        break


points = ~points # False pakeicia i True
points = points.astype(np.uint8) * 255
image = Image.fromarray(points, mode="L")

image.save(f'UlamoSpirale{dim}x{dim}.png')