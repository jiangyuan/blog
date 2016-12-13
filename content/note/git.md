# git 常用命令


## 日常积累


提交前，查看改动的文件名称，[详细](http://stackoverflow.com/questions/1552340/git-show-all-changed-files-between-two-commits)

    `git diff --name-only` 或者  `git diff --name-status`


## 远程仓库相关

```
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push [name] [newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
```


```
如果想把本地的分支 test 提交到远程仓库，并作为远程仓库的 master 分支，
或者作为另外一个名叫 test 的分支，如下：

$ git push origin test:master            // 提交本地 test 分支作为远程的 master 分支
$ git push origin test:test              // 提交本地 test 分支作为远程的 test 分支
```


## 分支 (branch) 操作相关命令

```
查看本地分支：$ git branch
查看远程分支：$ git branch -r （ 如果还是看不到就先 git fetch origin 先 ）
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
直接检出远程分支：$ git checkout -b [name] [remoteName] (如：git checkout -b myNewBranch origin/dragon)
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
合并最后的2个提交：$ git rebase -i HEAD~2 ---- 数字2按需修改即可（如果需提交到远端$ git push -f origin master 慎用！）
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name] 或 $ git push origin :[name] 
```


## 版本 (tag) 操作相关命令

```
查看版本：$ git tag
创建版本：$ git tag [name]
删除版本：$ git tag -d [name]
查看远程版本：$ git tag -r
创建远程版本(本地版本push到远程)：$ git push origin [name]
删除远程版本：$ git push origin :refs/tags/[name]
合并远程仓库的tag到本地：$ git pull origin --tags
上传本地tag到远程仓库：$ git push origin --tags
创建带注释的tag：$ git tag -a [name] -m 'yourMessage'
```


## 忽略一些文件、文件夹不提交

```
在仓库根目录下创建名称为“.gitignore”的文件，写入不需要的文件夹名或文件，每个元素占一行即可，如
target
bin
*.db
```

## 后悔药

```
删除当前仓库内未受版本管理的文件：$ git clean -f
恢复仓库到上一次的提交状态：$ git reset --hard
回退所有内容到上一个版本：$ git reset HEAD^
回退 a.js 这个文件的版本到上一个版本：$ git reset HEAD^ a.js
回退到某个版本：$ git reset 057d 
将本地的状态回退到和远程的一样：$ git reset –hard origin/master  
向前回退到第3个版本：$ git reset –soft HEAD~3
```

## Git一键推送多个远程仓库

```
编辑本地仓库的.git/config文件：
[remote "all"]
    url = git@github.com:dragon/test.git
    url = git@gitcafe.com:dragon/test.git
这样，使用git push all即可一键Push到多个远程仓库中。
```


#### 参考文章

[Git常用操作命令](http://rongjih.blog.163.com/blog/static/335744612010112562833316/)