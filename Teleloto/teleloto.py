import numpy as np

def printTicket(ticket):
    print("Bilietas:")
    line= "|─────|─────|─────|─────|─────|"
    print("   M     J     R     G     Ž   ", line, sep="\n")
    for y in range(ticket.shape[0]):
        print("|", end="")
        for x in range(ticket.shape[1]):
            print(" ", end="")
            print ("%3d" % ticket[y][x], end="")
            print(" |", end="")
        print("\n", line, sep="")

# Generate a ticket
ticket = np.empty((5,5), dtype="i")
for i in range(5):
    ticket[i] = np.random.choice(range(1+15*i, 15*(1+i)+1), 5, replace=False)
ticket = ticket.T

roll = np.random.choice(range(1,76), 35, replace=False)

printTicket(ticket)
print(roll)