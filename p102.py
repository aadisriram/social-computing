from __future__ import division
from collections import defaultdict
import csv
import operator


node_edges = defaultdict(list)
with open("./files/107.edges") as edges_file:
    for edge in edges_file:
        x = [int(i) for i in edge.split()]
        node_edges[x[0]].append(x[1])
        node_edges[x[1]].append(x[0])

circles_list = {}
with open("./files/107.circles") as circles_file:
    for circle in circles_file:
        circle_split = circle.split()
        circle_name = circle_split[0]
        nodes = []
        circle_def = [int(i) for i in circle_split[1:]]
        for node in circle_def:
            nodes.append(node)
        circles_list[circle_name] = nodes

circle_edge_count = {}
for circle in circles_list:
    count = 0
    node_list_circle = circles_list.get(circle, [])
    for node in node_list_circle:
        neighbors = node_edges.get(node, [])
        for node_neighbor in neighbors:
            if node_neighbor in node_list_circle:
                count += 1
    edge_count = len(node_list_circle)
    max_count = edge_count*(edge_count - 1)/2
    count /= 2
    circle_edge_count[circle] = count/max_count

reverse_sorted_list = {}
reverse_sorted_list = sorted(circle_edge_count.items(), key=operator.itemgetter(1), reverse=True)

circle_degree = {}
for circle in circles_list:
    sum_inter = 0
    for other_circles in circles_list:
        if other_circles != circle:
            inter_len = len(list(set(circles_list.get(circle)) & set(circles_list.get(other_circles))))
            union_len = len(list(set(circles_list.get(circle)) | set(circles_list.get(other_circles))))
            sum_inter += inter_len/union_len
    circle_degree[circle] = sum_inter

output_one = []
for node in reverse_sorted_list:
    output = list()
    output.append(node[0])
    output.append(circle_edge_count.get(node[0], 0))
    output.append(node[1])
    output_one.append(output)

with open("./output/two-ozeros.csv", "wb") as output_file_107:
    writer = csv.writer(output_file_107)
    writer.writerows(output_one)
