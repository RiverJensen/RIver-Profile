import math 


name = "River"
age = 27    
is_student = True

name = input("What is your name? ")

print("Hello, " + name + "!")


age = 20 
if age >= 18:
    print("You are an adult.")
else: 
    print("You are a minor.")

    for i in range (1, 10):
        print(i)    
    
    count = 0 
    while count < 10:
        print(count)
        count += 1



def add(a, b):      
    return a + b    


def greet(name):
    return "Hello, " + name + "!"

print(greet("River"))

fruits = ["apple", "banana", "cherry"]
print(fruits[0])  



person = {"name": "River", "age": 25}
print(person["name"])  # River


class Person: 
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return "Hello, " + self.name + "!"
    

    