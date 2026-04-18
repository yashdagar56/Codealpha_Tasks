import random

WORDS = ["python", "hangman", "coding", "keyboard", "monitor"]

def choose_word():
    """
    Random Selection
    Returns a random word from the hardcoded list.
    """
    return random.choice(WORDS)

def display_state(word, guessed_letters, attempts_remaining):
    """
    Display State
    Shows the current guessed progress as well as remaining attempts.
    Reveals correctly guessed letters in their exact positions.
    """
  
    display = ""
    for letter in word:
        if letter in guessed_letters:
            display += letter + " "
        else:
            display += "_ "
    
    print("\nWord: " + display.strip())
    print(f"Attempts remaining: {attempts_remaining}")

def hangman():
    """
    Main game function containing the while loop and all game logic.
    """
    print("Welcome to Text-Based Hangman!")
    
    word_to_guess = choose_word()
    guessed_letters = []
    incorrect_guesses = 0
    max_incorrect_guesses = 6

    while incorrect_guesses < max_incorrect_guesses:
        attempts_remaining = max_incorrect_guesses - incorrect_guesses

        display_state(word_to_guess, guessed_letters, attempts_remaining)

        all_guessed = True
        for letter in word_to_guess:
            if letter not in guessed_letters:
                all_guessed = False
                break
                
        if all_guessed:
            print(f"\nCongratulations! You revealed all letters and guessed the word correctly: {word_to_guess}")
            return
        guess = input("\nGuess a letter: ")

        guess = guess.lower()

        if len(guess) != 1 or not guess.isalpha():
            print("\nInvalid input! Please enter exactly one alphabetic character.")
            continue

        if guess in guessed_letters:
            print(f"\nYou already tried '{guess}'. Please try a different letter.")
            continue

        guessed_letters.append(guess)

        if guess not in word_to_guess:
            print(f"\nSorry, '{guess}' is not in the word.")
            incorrect_guesses += 1
        else:
            print(f"\nGood job! '{guess}' is in the word.")

    print("\nGame Over! You have exhausted all 6 incorrect guesses.")
    print(f"The correct word was: {word_to_guess}")

if __name__ == "__main__":
    hangman()
