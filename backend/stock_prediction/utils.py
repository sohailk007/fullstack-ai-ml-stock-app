import os
from django.conf import settings
from matplotlib import pyplot as plt


def save_plot(plot_path: str) -> str:
    """
    Save the current matplotlib figure to MEDIA_ROOT and return its public URL.
    """
    file_path = os.path.join(settings.MEDIA_ROOT, plot_path)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    plt.savefig(file_path)
    plt.close()

    return settings.MEDIA_URL + plot_path
