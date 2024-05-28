f = open("questions_pssiapka.txt", "r", encoding="utf-8")
lines = f.readlines()

for i in range(len(lines)):
    if(i % 6 == 0):
        print("{ question: \"", end="")
        print(lines[i].strip(), end="")
        print("\",", end="")
        print("answers: [")
    elif(i % 6 >= 1 and i % 6 <= 4):
        print("\"", lines[i].strip(), "\",", end="")
    elif(i % 6 == 5):
        print("\"", lines[i].strip(), "\"],")
        print("userAnswer: \"\",},")