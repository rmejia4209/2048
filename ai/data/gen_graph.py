import matplotlib
from collections import Counter
import numpy as np
import matplotlib.pyplot as plt


def generate_cumulative_freq_graph(
    file_name: str, output_name: str, title: str
) -> None:

    raw_data = np.loadtxt(file_name, delimiter=",", dtype=str)
    freq_data = Counter(raw_data)

    tiles, freq = zip(
        *sorted(freq_data.items(), key=lambda item: int(item[0]))
    )
    freq = np.array(freq)
    # to begin from 100%, reverse frequencies then reverse cumulative sums
    cumulative_counts = np.cumsum(freq[::-1])[::-1]
    total = cumulative_counts[0]
    percentages = cumulative_counts / total * 100

    _, ax = plt.subplots(figsize=(8, 6))
    ax.bar(tiles, percentages, width=0.95)
    ax.set_ylabel("Percent of Runs (%)")
    ax.set_title(title)
    ax.set_xticks(tiles)

    cell_text = [[f'{p:.0f}%'] for p in percentages]
    plt.table(
        cellText=cell_text,
        rowLabels=tiles,
        colLabels=["Percent of Runs (%)"],
        cellLoc="center",
        rowLoc="center",
        loc="bottom",
        bbox=[0.0, -0.6, 1, 0.5]
    )

    plt.subplots_adjust(left=0.1, bottom=0.35)
    plt.savefig(output_name)
    return


def generate_threaded_performance_graph(
     file_name: str, output_name: str, title: str
) -> None:

    raw_data = np.loadtxt(file_name, delimiter=",", dtype=float, skiprows=1)
    cumulative_performance = {}
    num_trials = {}
    for row in raw_data:
        cumulative_performance[row[0]] = (
            cumulative_performance.setdefault(row[0], 0) + row[-1]
        )
        num_trials[row[0]] = num_trials.setdefault(row[0], 0) + 1

    threads, avg_performance = zip(
        *[(t, p / num_trials[t]) for t, p in cumulative_performance.items()]
    )

    plt.plot(threads, avg_performance, marker="o")
    plt.grid(True)
    plt.xlabel("Threads")
    plt.xticks(range(0, 68, 4))
    plt.ylabel("Trials per second")
    plt.title(title)
    plt.savefig(output_name)


if __name__ == "__main__":
    matplotlib.use("Agg")

    generate_cumulative_freq_graph(
        "pmcs_scores.csv",
        "pmcs_performance.png",
        "Pure Monte Carlo Search Performance"
    )

    generate_threaded_performance_graph(
        "pmcs_opt_t.csv",
        "pmcs_threaded_performance.png",
        "Performance of Pure Monte Carlo Search in Parallel Evaluations"
    )
