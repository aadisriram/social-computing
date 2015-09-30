import operator
import csv


node_list_414 = {}
node_feature_414 = {}
with open("./files/facebook_combined.txt") as combined_file:
    for line in combined_file:
        x = [int(i) for i in line.split()]
        if x[0] == 414:
            node_list_414[x[1]] = 0
            node_feature_414[x[1]] = 0

with open("./files/414.circles") as circles_file:
    for circle in circles_file:
        circle_def = [int(i) for i in circle.split()[1:]]
        for node in circle_def:
            node_list_414[node] = node_list_414.get(node, 0) + 1

ego_feature_set = list()
with open("./files/414.egofeat") as ego_feature:
    for line in ego_feature:
        ego_feature_set = [int(i) for i in line.split()]

reverse_sorted_list = {}
with open("./files/414.feat") as node_feature:
    for features in node_feature:
        node_feature_set = [int(i) for i in features.split()]
        ct = 0
        node = node_feature_set[0]
        for feature in node_feature_set[1:]:
            if feature == 1 and feature == ego_feature_set[ct]:
                node_feature_414[node] = node_feature_414.get(node, 0) + 1
            ct += 1
    reverse_sorted_list = sorted(node_feature_414.items(), key=operator.itemgetter(1), reverse=True)

output_four = []
for node in reverse_sorted_list:
    output = list()
    output.append(node[0])
    output.append(node_list_414.get(node[0], 0))
    output.append(node_feature_414.get(node[0], 0))
    output_four.append(output)

output_four = sorted(output_four, key=lambda x: x[1], reverse=True)

with open("./output/three-fonef.csv", "wb") as output_file_414:
    writer = csv.writer(output_file_414)
    writer.writerows(output_four)

node_list_698 = {}
node_feature_698 = {}
with open("./files/facebook_combined.txt") as combined_file:
    for line in combined_file:
        x = [int(i) for i in line.split()]
        if x[0] == 414:
            node_list_698[x[1]] = 0
            node_feature_698[x[1]] = 0

with open("./files/698.circles") as circles_file:
    for circle in circles_file:
        circle_def = [int(i) for i in circle.split()[1:]]
        for node in circle_def:
            node_list_698[node] = node_list_698.get(node, 0) + 1

ego_feature_set = list()
with open("./files/698.egofeat") as ego_feature:
    for line in ego_feature:
        ego_feature_set = [int(i) for i in line.split()]

reverse_sorted_list = {}
with open("./files/698.feat") as ego_feature:
    for features in ego_feature:
        node_feature_set = [int(i) for i in features.split()]
        ct = 0
        node = node_feature_set[0]
        for feature in node_feature_set[1:]:
            if feature == ego_feature_set[ct]:
                node_feature_698[node] = node_feature_698.get(node, 0) + 1
                ct += 1
        reverse_sorted_list = sorted(node_feature_698.items(), key=operator.itemgetter(1), reverse=True)

output_six = []
for node in reverse_sorted_list:
    output = list()
    output.append(node[0])
    output.append(node_list_698.get(node[0], 0))
    output.append(node[1])
    output_six.append(output)

with open("./output/three-sninee.csv", "wb") as output_file_698:
    writer = csv.writer(output_file_698)
    writer.writerows(output_six)
