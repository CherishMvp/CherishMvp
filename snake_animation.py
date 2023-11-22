from asciimatics.screen import Screen
from time import sleep


def update(screen):
    while True:
        screen.print_at("Hello, Greedy Snake!", 0, 0)
        screen.refresh()
        sleep(0.5)


Screen.wrapper(update)
