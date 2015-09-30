import operator
import csv


node_list_zero = {}
with open("./files/facebook_combined.txt") as combined_file:
    for line in combined_file:
        x = [int(i) for i in line.split()]
        if x[0] == 0:
            node_list_zero[x[1]] = 0
        else:
            break

node_edge_count_zero = {}
with open("./files/0.edges") as edges_file:
    for edge in edges_file:
        x = [int(i) for i in edge.split()]
        node_edge_count_zero[x[0]] = node_edge_count_zero.get(x[0], 0) + 1
        node_edge_count_zero[x[1]] = node_edge_count_zero.get(x[1], 0) + 1
        # print x

reverse_sorted_list = {}
with open("./files/0.circles") as circles_file:
    for circle in circles_file:
        circle_def = [int(i) for i in circle.split()[1:]]
        for node in circle_def:
            node_list_zero[node] = node_list_zero.get(node, 0) + 1
    reverse_sorted_list = sorted(node_list_zero.items(), key=operator.itemgetter(1), reverse=True)

output_zero = []
for node in reverse_sorted_list:
    output = list()
    output.append(node[0])
    output.append(node_edge_count_zero.get(node[0], 0))
    output.append(node[1])
    output_zero.append(output)

with open("./output/one-zero.csv", "wb") as output_file_zero:
    writer = csv.writer(output_file_zero)
    writer.writerows(output_zero)

node_list_348 = {}
with open("./files/facebook_combined.txt") as combined_file:
    for line in combined_file:
        x = [int(i) for i in line.split()]
        if x[0] == 348:
            node_list_zero[x[1]] = 0

node_edge_count_348 = {}
with open("./files/348.edges") as edges_file:
    for edge in edges_file:
        x = [int(i) for i in edge.split()]
        node_edge_count_348[x[0]] = node_edge_count_348.get(x[0], 0) + 1
        node_edge_count_348[x[1]] = node_edge_count_348.get(x[1], 0) + 1

reverse_sorted_list_348 = {}
with open("./files/348.circles") as circles_file:
    for circle in circles_file:
        circle_def = [int(i) for i in circle.split()[1:]]
        for node in circle_def:
            node_list_348[node] = node_list_348.get(node, 0) + 1
    reverse_sorted_list_348 = sorted(node_list_348.items(), key=operator.itemgetter(1), reverse=True)

output_348 = []
for node in reverse_sorted_list_348:
    output = list()
    output.append(node[0])
    output.append(node_edge_count_zero.get(node[0], 0))
    output.append(node[1])
    output_348.append(output)

with open("./output/one-tfeight.csv", "wb") as output_file_348:
    writer = csv.writer(output_file_348)
    writer.writerows(output_348)
